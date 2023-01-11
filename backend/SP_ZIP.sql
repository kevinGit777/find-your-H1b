CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ZIP`(IN var_zip INT)
BEGIN
	declare num int;
    declare finished int default 0;
	declare com_name VARCHAR(128);
	
	
	DECLARE cur CURSOR FOR 
	(select CompanyName, count(CompanyName) as num_fav
	from CompanyInfos natural join Locations natural join Favorites
	where abs(zipcode- var_zip )<100 
	group by CompanyName);

	DECLARE cur CURSOR FOR 
	(select companyname, companyid , state , city , street , zipcode, JobTitle 
	from ((CompanyInfos natural join Locations) natural join Releases natural join Jobs) as out
	where abs(zipcode- var_zip )<100 
	order by count(select *
	from (CompanyInfos natural join Locations natural join Favorites )as inner
	where out.companyid = inner.companyid ));
	
	
	DECLARE continue HANDLER FOR NOT FOUND SET finished = 1;
	
	drop table if exists res_Table;

	CREATE TABLE res_Table(
		companyname  varchar(200),
		companyid varchar(200), 
		state varchar(200), 
		city varchar(200), 
		street varchar(200), 
		zipcode varchar(200), 
		JobTitle varchar(200)
		);

	OPEN cur;

	REPEAT
		Fetch cur INTO cur_companyname, cur_companyid , cur_state , cur_city , cur_street , cur_zipcode, cur_JobTitle ;
		IF NOT EXISTS (select * from res_Table where companyname=cur_companyname, cur_companyid= companyid , 
		cur_state =state , cur_city = city , cur_street = street , cur_zipcode =zipcode, cur_JobTitle = JobTitle) Then
			INSERT IGNORE INTO res_Table()
			values( cur_companyname, cur_companyid , cur_state , cur_city , cur_street , cur_zipcode, cur_JobTitle );
		End if;
		UNTIL finished
		END REPEAT;

	close cur;

	select * from res_Table order by order by count(select *
	from (CompanyInfos natural join Locations natural join Favorites )as inner
	where out.companyid = inner.companyid ); desc limit 100;
END
