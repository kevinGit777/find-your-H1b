import csv
address = set()
address_dict = dict()

job_set = set()
job_dict = dict()

company_add_dict = dict()
company_job_dict = dict()
company_id_dict = dict()

def processJobTitle( ori:str):
    unmatched_pattern = ['- Kbgfjg','- kbgfjg',"- kbgfjg",'- Cas-','- Kboeytest','- 1615','[','-Kbgfjg','20968','20516',' 1615',' 20521', ' 20710',r"- \(1615",r" \(12",r" \(1615",r" \(10760",r" \(11118",r" \(7",r" \(6",r" \(0",r" \(1"," - 6",r" \(Bal"," 6533",r" \A710"," 20898"," 6755",r" \(20521",r"\(210",r"\(203"," 102"," -1615",r"\(5",r"\(4",r"\(3",r"\(8",r"\(208",r"\( 12"," - 50771"," 165."," 218"," 44378"," 45025"," 464", " 51558"," 52072","1615."," -Kboey"," Kbgfjg"," 20278"," 20025",r" \(20025",r" \(A710"]
    for pat in unmatched_pattern:
        if pat in ori:
            ori = ori.split(pat)[0]
    ori =  "".join(ori.split(r"â€\“"))
    ori.replace("â€", "")
    ori=ori.lower()
    return ori

with open("src\\accountant.csv" , encoding='utf-8-sig') as file:
    reader = csv.reader(file, delimiter=',', quotechar='"')
    for row in reader:
        #print(row)
        assert len(row) == 7
        if(row[5].strip() == ""):
            row[5] = "00000"
        address.add( (row[5], row[6], row[3], row[4])  ) #zip, street, city, state
        if( company_add_dict.get(row[0]) == None):
            company_add_dict[row[0]] = set()
        company_add_dict[row[0]].add((row[5], row[6], row[3], row[4]) )

        if company_job_dict.get((row[0], (row[5], row[6], row[3], row[4]) )) == None:
            company_job_dict[(row[0], (row[5], row[6], row[3], row[4]) )] = set()

        processed_job = processJobTitle(row[1])
        company_job_dict[(row[0], (row[5], row[6], row[3], row[4]) )].add( processed_job)
        job_set.add( processed_job )


        

with open("src\\sde.csv", encoding='utf-8-sig') as file:
    reader = csv.reader(file, delimiter=',', quotechar='"')
    for row in reader:
        assert len(row) == 7
        if(row[5].strip() == ""):
            row[5] = "00000"
        address.add( (row[5], row[6], row[3], row[4])  ) #zip, street, city, state
        if( company_add_dict.get(row[0]) == None):
            company_add_dict[row[0]] = set()
        company_add_dict[row[0]].add((row[5], row[6], row[3], row[4]) )

        if company_job_dict.get((row[0], (row[5], row[6], row[3], row[4]) )) == None:
            company_job_dict[(row[0], (row[5], row[6], row[3], row[4]) )] = set()

        processed_job = processJobTitle(row[1])
        company_job_dict[(row[0], (row[5], row[6], row[3], row[4]) )].add( processed_job)
        job_set.add( processed_job )

counter = 1
for add in address:
    address_dict[add] = counter
    counter+=1

counter = 1
for job in job_set:
    #print(job)
    job_dict[job] = counter
    counter+=1

with open("src\\job_insert.txt", 'w', encoding='utf-8') as file:
    for key, value in job_dict.items():
        file.write(f"insert into Jobs values({value}, \" {key}\");\n" )

with open("src\\location_insert.txt", 'w',  encoding='utf-8') as file:
    for  key, value in address_dict.items():
        file.write(f"insert into Locations(LocationId , Zipcode, Street , City , State ) values( {value}, {key[0]} , \"{key[1]}\" , \"{key[2]}\" , \"{key[3]}\");\n" )

with open("src\\companyInfo_insert.txt", 'w', encoding='utf-8') as file:
    counter  = 1
    for key, value in company_add_dict.items():
        for add in value:
            file.write(f"insert into CompanyInfos values({counter} , {address_dict[add]}, \"{key}\");\n" )
            company_id_dict[ (key, add)] = counter
            counter += 1

with open( "src\\realease_insert.txt", 'w', encoding='utf-8') as file:
    for key, value in company_job_dict.items():
        for jobs in value:
            file.write(f" insert into Releases values( {company_id_dict[key]} , {job_dict[jobs]} );\n" )