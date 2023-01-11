import random
import names
from datetime import timedelta, date
import string

def getRandomUser():
    gender = random.choice([ "male", "female"])
    name = names.get_full_name(gender=gender)
    res = f"insert into UserInfos( Gender, Name,  Birth_date, Phone_Number , Email , Password) value( \"{getGender(gender)}\" , \"{name}\", \"{getBirthday()}\", \"{getPhone()}\", \"{getEmail(name)}\", \"{getPassWord()}\" );\n" 
    return res


def getGender(gender):
    if random.randint(0, 10) < 2:
        return "non-binary"
    else:
        return gender

def getBirthday():
    start_dt = date(1950, 1, 1)
    end_dt = date(2016, 12, 31)
    res_dt = start_dt + timedelta( random.randint( 0, int((end_dt - start_dt).days) ) ) 
    return res_dt.strftime("%Y/%m/%d")

def getPhone():
    res = str(random.randint(1, 9))
    for n in range(9):
        res = res + str(random.randint(0, 9))
    return res

def getEmail(name:str):
    suffix = random.choice([ "gmail.com" , "yahoo.com" ,"Hotmail.com", "aol.com", "Outlook.com", "icloud.com", "me.com" ])
    name = name.replace(" ", "_")
    num = random.randint(1, 99999)
    return "".join((name, str(num), "@" , suffix))
    
def getPassWord():
    len = random.randint( 3, 26 )
    res = ""
    for x in range(len):
        res = res + random.choice(string.ascii_letters+string.digits)
    return res

if __name__ == "__main__":
    with open("generateUser.txt", 'w') as file:
        file.write("use test1;\n")
        for i in range(2000):
            file.write(getRandomUser())



