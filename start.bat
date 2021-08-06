@echo off
Title MARE

color 2

echo.    Digite  1  e Precione Enter Para Ligar o Bot!
echo.
echo. ___________________________________________________________
echo.                                                           
echo.              1 - Ligar Bot                                                           
echo. __________________________________________________________
echo.
set /p choice=Digite uma opcao:
if '%choice%'=='1' goto :iniciarbot
:iniciarbot
cls
echo. ___________________________BOT ONLINE________________________________

node .

pause .

:sair
exit
