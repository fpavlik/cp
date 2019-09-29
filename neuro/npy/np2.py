#!/usr/local/bin/python3
# Добрый день!!!
# Скрипт 1 Начало

# Пол, Возраст и т.д. Демографические
# Психотип
# Профессиональные навыки
# Социальныя группа
# Социальная сеть
# Экзит интервью
# Тестирование, анкеты
# Опыт (работы, руководства, функциональный)
# Взаимоотношения
# Хобби
# Иностранные языки

# Сертификаты
# Участие в корпаротивных активностей
# Образование
# Стаж
# fpavlik@mail.ru
import numpy as np, os, sqlite3
# SQLite3
cd = sqlite3.connect("net.db")
cursor = cd.cursor()

while True:
    listin = list()
    listou = list()
    dic = dict()
    #os.system('clear')
    print ("Добрый день!!!")
    print ("Модуль обучения нейронной сети по рекомендации профессии для переквалификации\r")
    #age = input("Введите Ваш возраст [18 - 90]: ")

    gen = int(input("Ваш пол [Ж:1, М:0]: "))
    fri = int(input("Отношение с коллективом [Хорошее:0, Не очень:1,]: "))
    #interest = input("Ваши интересы [Общение:0, Творчество:1, Рукоделие:2]: ")
    gra = int(input("Ваш уровень [Эксперт:0, Специалист:1]: "))
    #skill = input("Ваши профессиональные навыки [Технарь:0, Гуманитарий:1, Разнорабочий:2]: ")
    j = int(input("Какая профессия переквалификации для Вас наиболее привлекательна [Программист:0, Тестировщик:1, Аналитик: 2, Сценарист игр: 3, UX:4, Художник:5]: "))



    # pragma table_info(input)
    cursor.execute("CREATE TABLE IF NOT EXISTS input ( id INTEGER PRIMARY KEY AUTOINCREMENT, gender INTEGER, friendship INTEGER, grade INTEGER, job INTEGER)")
    cursor.execute("INSERT INTO input (gender, friendship, grade, job) VALUES (?, ?, ?, ?)", (gen, fri, gra, j))
    cursor.execute("SELECT gender, friendship, grade, job FROM input")
    for row in cursor.fetchall():
        listin.append( row[0:3] )
        listou.append( row[3] )
        
        if (dic.get(row) == None):
            dic[row] = 1
        else:
            dic[row] += 1
        #dic.setdefault(row, 1)
    print(dic.get(row))