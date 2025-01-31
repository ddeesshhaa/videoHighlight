import torch
from torch.autograd import Variable
import time
import os
import sys
from sklearn.metrics import confusion_matrix
import seaborn as sn
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from utils import AverageMeter, calculate_accuracy
device = torch.device ("cuda:0" if torch.cuda.is_available () else "cpu")


def drawconfusion( data_loader, model ,criterion, labels, type):
    y_pred=[]
    y_true=[]
    classes = labels
    model.eval ( )

    for i, (inputs, targets) in enumerate(data_loader):
        inputs = Variable(inputs)
        targets = Variable(targets)
        outputs = model(inputs)

        out = (torch.max ( torch.exp ( outputs ) , 1 )[ 1 ]).data.cpu ( ).numpy ( )

        y_pred.extend ( out )

        label = targets.data.cpu ( ).numpy ( )
        y_true.extend ( label )

        # loss = criterion(outputs, targets)
        # acc = calculate_accuracy(outputs, targets)

        # Build confusion matrix
    cf_matrix = confusion_matrix ( y_true , y_pred )
    df_cm = pd.DataFrame ( cf_matrix / np.sum ( cf_matrix , axis=1 ) , index=[ i for i in classes ] ,
                           columns=[ i for i in classes ] )
    plt.figure ( )
    plt.rcParams.update ( {'font.size':0.5 } )
    sn.heatmap ( df_cm , annot=True , cmap="Blues" )
    if type=="train":
        plt.savefig ( os.path.join ( 'C:/Users/desha/Downloads/' , 'train_R3D-matrix.png' ) , dpi=300 )
    else:
        plt.savefig(os.path.join('C:/Users/desha/Downloads/', 'val_R3D-matrix.png'), dpi=300)