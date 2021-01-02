import math

# print("sieeema")

# x = input("podajx")
# print("Ile znaków: ",len(x))

# for i in x:
#     if i.isdigit():
#         print(i, end="")

# for j in x:
#     if j.isalpha():
#         print(j, end="")

while True:

    pierwsza = float(input("podaj pierwsza liczbe: "))
    znak = input("Podaj znak działania")
    if znak == '!':
        print(math.factorial(pierwsza))
    else:
        druga = float(input("podaj druga liczbe: "))
        if znak == '+':
            print(pierwsza + druga)
        elif znak == '-':
            print(pierwsza - druga)
        elif znak == '*':
            print(pierwsza * druga)
        elif znak == '/':
            print(pierwsza / druga)