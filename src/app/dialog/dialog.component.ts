import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  onSendPressed(): void {
    let msg = {
      content: this.data.content,
      toSend: true
    }
    this.dialogRef.close(msg);
  }
}

export interface DialogData {
  content: string,
  toSend: boolean
}
