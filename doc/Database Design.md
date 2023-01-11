# Stage 3: Database Implementation and Indexing
In this stage, we will show the DDL we use to construct tables and results of them.

We also develop two advanced SQL and will show their results, including comparsions between **before indexing** and **after indexing**.

## Data Definition Language (DDL) commands

~~~
create table UserInfos(UserId int primary key AUTO_INCREMENT NOT NULL, Name VARCHAR(32), Gender CHAR(16), Birth_date DATE, Phone_Number CHAR(10), Email VARCHAR(64) UNIQUE NOT NULL, Password VARCHAR(32) );

create Table Locations(LocationId INT AUTO_INCREMENT NOT NULL, Zipcode INT, Street VARCHAR(64), City VARCHAR(32), State VARCHAR(16), primary key (Zipcode ,Street  dataid ,City , State ) );

create table CompanyInfos(CompanyId INT primary key AUTO_INCREMENT NOT NULL, LocationID INT REFERENCES Locations(LocationID), CompanyName VARCHAR(128)) ;

create table Favorites(FavoriteId INT primary key AUTO_INCREMENT NOT NULL, UserId INT REFERENCES UserInfos(UserId), CompanyId INT REFERENCES CompanyInfos(CompanyId) ) ;

create Table TempRanks(TransactionId INT primary key AUTO_INCREMENT NOT NULL, CompanyId INT REFERENCES CompanyInfos(CompanyID), Ranking INT);

create Table Jobs(JobId INT primary key AUTO_INCREMENT NOT NULL, JobTitle VARCHAR(64) UNIQUE NOT NULL);

create Table Releases(CompanyID INT REFERENCES CompanyInfos(CompanyID), JobId INT REFERENCES jobs(JobID),  primary key (JobId, CompanyID));
~~~
Above is the latest version of DDL, this part will look a little bit different from the relational schema in Stage 2 in that, after we get the true data, we find that the length of some strings is not enough.

## Tables looklike
### CompanyInfo
![CompanyInfo](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_company.png)
### Favorites
![Favorites](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_favorites.png)
### Jobs
![Jobs](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_jobs.png)
### Locations
![Locations](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_locations.png)
### Releases
![Releases](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_releases.png)
### TempRanks
![TempRanks](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_tempranks.png)
### UserInfos
![UserInfos](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/show_userinfos.png)
## Tables with at least 1000 records
All tables we created have more than 1000 records.

![CompanyInfo](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_company.png)
![Favorites](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_favorites.png)
![Jobs](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_jobs.png)
![Locations](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_locations.png)
![Releases](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_releases.png)
![TempRanks](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_tempranks.png)
![UserInfos](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/num_userinfos.png)

## Advanced Query
### First query
![1ndquery](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/advanced_query1.jpg)


### Second query
![2ndquery](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/queryandresult.png)

## Indexing Analysis
### First  advanced subquery
~~~
 (SELECT distinct CompanyName, l.Zipcode FROM test1.CompanyInfos as c 
left join test1.Locations as l on c.LocationID = l.LocationId
where Zipcode like "941%")
union 
(
select distinct c.CompanyName,Zipcode from test1.CompanyInfos as c 
left join test1.TempRanks as t on c.CompanyId = t.CompanyId natural join test1.Locations
where t.Ranking < 100
)
limit 15;
~~~
####  before indexing (default indexing)

![image-20221021195208953](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/advanced_query_default.png)

Before indexing, after running the EXPLAIN ANALYZE command, we found the runtime was not ideal.

Therefore, we decided to optimize the runtime by selecting Zipcode as our index first because we want to mimic users behavior who want to know some nearest companies which support H1B.



#### after indexing Zipcode

![image-20221021195256651](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/advanced_query1_zip.png)

We choose Zipcode first because it will contain infomation related to users geolocation information.

After we setting up this index, we find that actual runtime for most of operations above have been lowered which means this index have some effects. However, it almost the same with no index situation. 

The reason why it does not have significant influence may be it is the used as the unique key which is not an ideal situation for using index. 



#### after indexing CompanyName 

![image-20221021200228603](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/advanced_query1_companyname.png)

Then, we want to try whether CompanyName can help improve the runtime because it also contains many information that we need. 

After indexing CompanyName, we find that although the runtime has dropped compared with no indexing situation but this index's effect is also not so obvious.

we think it maybe because companyName are not used for filter condition so it index will be seldomly make impact.

So, we turn to Ranking attribute because it has more duplicates than CompanyName.


#### after indexing Ranking 

![image-20221021194956315](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/advanced_query1_ranking.png)

Finally, We chose Ranking because it is the filter condition of other part of union. So we want to see whether index can help us improve the query in this part. 

As a result, we find that the query has been improved greatly (upper bound : from 0.035 to 0.003). All runtime has been reduced grealy. We think it is because using index can help us extracting records corresponding to each rankings. Therefore, when we need to search for records within required rankings, it will fastly return corresponding result which finally improve our result. So it is a good idea to choose ranking as our index.


### Second Query
This query is used to get those company and job informations when the Jobtitle is constrained to some specific ones.
~~~
select CompanyId, CompanyName, count(JobTitle) as numbers
from CompanyInfos natural join Releases natural join Jobs
where JobTitle like '%engineer%'
group by CompanyId;
~~~

#### Before any indexing
![before](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/2ndbeforeindex.png)
#### After indexing
![after1](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/2ndafter1index.png)
We first use the CompanyId as index to test the performance. And the time used dropped from 1.204 to 1.108.

And we test the second index to try to improve the performance more. This time we choose JobId as another index. However, this time in some cases, we can get a better performance while in other cases we cannot.

The best case is 1.050 as belows.
![after2](https://github.com/cs411-alawini/fa22-cs411-A-team016-spongebob/blob/main/doc/images/2ndafter2index.png)
