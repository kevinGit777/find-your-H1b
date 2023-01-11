# Programmed by Dirk
# Time: 2022/10/19 18:49
import random
import csv


def get_favorite():
    company_num = 6202
    result = []

    i = 1
    while i <= 5000:
        userid = random.randint(1, 2000)
        company_id = random.randint(1, company_num)
        if (userid, company_id) in result:
            continue
        else:
            result.append((i, userid, company_id))
            i += 1
    print(result)
    with open('favorite.csv', 'w', newline= '') as csvfile:
        writer = csv.writer(csvfile)
        # 写在一行的一个单元格内
        for item in result:
            writer.writerow(["insert into Favorites value({0}, {1}, {2});".format(item[0], item[1], item[2])])


if __name__ == '__main__':

    get_favorite()