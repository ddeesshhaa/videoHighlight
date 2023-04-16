import json
import csv
import matplotlib.pyplot as plt
import os

def readfiles(filename):
    my_file = open  ( filename , "r" )
    valacc=[]
    valloss=[]
    # reading the file
    data = my_file.read ( )
    data_into_list = data.split ( "\n" )
    for i in range ( 1 , 8 ):
        print ( data_into_list[ i ] )
        f = data_into_list[ i ].split ( "\t" )
        Accuracy = f[ 2 ]  # Accuracy
        valacc.append ( float ( Accuracy ) )
        loss = f[ 1 ]  # loss
        valloss.append(float(loss))
    my_file.close ( )
    return valloss,valacc

def DrawLoss( train_loss,val_loss,epochs=25 ):

    plt.figure()
    # plt.title("Training and Validation Loss")
    plt.rc ( 'font' , weight='bold' )
    plt.rcParams.update ( {'font.size': 12} )
    plt.plot(val_loss,label="Test",color="blue")
    plt.plot(train_loss,label="Train", color="orange")
    plt.xlabel("Epoch Number",fontsize=12,fontweight='bold')
    plt.ylabel("Loss",fontsize=12,fontweight='bold')
    plt.legend( loc= "upper right")
    plt.savefig(os.path.join(r'C:\Users\ALKODS\Desktop\R3D', 'R3D_Loss.png'),dpi=300)

def DrawAccur(tain_acur ,val_acur,epochs=25):
    plt.figure()
    # plt.title("Training and Validation Accuracy")
    plt.rc ( 'font' , weight='bold' )
    plt.rcParams.update ( {'font.size': 12} )
    plt.plot(val_acur,label="Test",color="blue")
    plt.plot(tain_acur,label="Train", color="orange")
    plt.xlabel("Epoch Number",fontsize=12,fontweight='bold')
    plt.ylabel("Accuracy",fontsize=12,fontweight='bold')
    plt.legend ( loc="lower right" )
    # plt.show()
    plt.savefig(os.path.join(r'C:\Users\ALKODS\Desktop\R3D', 'R3D_Accuracy.png'),dpi=300)



trainLosses, trainAccu = readfiles(os.path.join(r"C:\Users\ALKODS\Desktop\R3D", "train.log"))
valLosses, valAccu = readfiles(os.path.join(r"C:\Users\ALKODS\Desktop\R3D", "val.log"))
DrawLoss(trainLosses, valLosses, 7)
DrawAccur(trainAccu, valAccu, 7)
