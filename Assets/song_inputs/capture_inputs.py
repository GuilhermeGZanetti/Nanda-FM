#Script para capturar inputs e salvar num .txt
# Cada linha um input
# codBotao posição
import time
import keyboard 
import sys
import os

#Start measuring time
time_start = 0
time_click = 0
arquivo_inputs = open('assets/song_inputs/bulletproof_heart_inputs2.txt', 'w')
sair = False

q_code = 81
w_code = 87
o_code = 79
p_code = 80

def onKeyboardEvent(event):
    global time_start
    global time_click
    global arquivo_inputs
    global sair
    input_read = event.name
    print(input_read)
    if(time_start == 0):
        #Start measuring time
        time_start = time.time()
    
    if(input_read != 'c'):
        #Write the button code on the .txt
        if (input_read == 'q'):
            input_read = q_code
        elif (input_read == 'w'):
            input_read = w_code
        elif (input_read == 'o'):
            input_read = o_code
        elif (input_read == 'p'):
            input_read = p_code
        arquivo_inputs.write(str(input_read)+" ")
    else:  
        arquivo_inputs.close()
        sair = True 

    time_click = time.time()

    length = int(1000*(time_click - time_start)) # /2

    #Write the length to the .txt and break line
    arquivo_inputs.write(str(length)+"\n")

print("Comece a ouvir a música e apertar os botões Q W O P")
keyboard.on_press(onKeyboardEvent)


while not sair:
    pass


