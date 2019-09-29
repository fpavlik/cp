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
    # cursor.execute("CREATE TABLE IF NOT EXISTS input ( id INTEGER PRIMARY KEY AUTOINCREMENT, gender INTEGER, friendship INTEGER, grade INTEGER, job INTEGER)")
    cursor.execute("INSERT INTO input (gender, friendship, grade, job) VALUES (?, ?, ?, ?)", (gen, fri, gra, j))
    cursor.execute("SELECT gender, friendship, grade, job FROM input")
    for row in cursor.fetchall():
        listin.append( row[0:3] )
        listou.append( row[3] )
    tuplein = tuple(listin)
    tupleou = listou[0::1]
    print( type(listin) )
    print( type(listou) )

    def sigmoid(x, der = False):
        fa = 1 / (1 + np.exp(-x))
        if (der == True):
            return fa * (1 - fa)
        return fa

    # Входные данные 
    inp = np.array(tuplein)
        #[
        #            [1, 0, 0],
        #            [1, 2, 1],
        #            [0, 1, 1]
        #            ])

    # Выходные данные
    out = np.array(tupleou).T #[[1, 1, 0]]).T


    np.random.seed(1)
    syn0 = 2 * np.random.random((3, 1)) - 1
    for iter in range(10000):
        l0 = inp
        l1 = sigmoid( np.dot(l0, syn0) )
        l1_error = out - l1
        l1_delta = l1_error * sigmoid(l1, True)

        syn0 +=np.dot(l0.T, l1_delta)

    print ( l1 )