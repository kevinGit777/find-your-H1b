
SET SQL_SAFE_UPDATES = 0;
DELIMITER //
create trigger Update_Rank	before INSERT on Favorites
for each row
begin
set @Default_Rank = 100;

IF (select count(*)
from TempRanks
where CompanyId = new.CompanyId) = 0
then 
insert into TempRanks(CompanyId, Ranking) Values(new.CompanyId, @Default_Rank);
else

update TempRanks
set Ranking = Ranking+1
where TransactionId in (select TransactionId from (
select TransactionId 
from TempRanks
where  CompanyId = new.CompanyId) as a);

end IF;
end	 //
DELIMITER ;
SET SQL_SAFE_UPDATES = 1;