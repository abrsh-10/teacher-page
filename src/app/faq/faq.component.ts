import { Component, OnInit } from '@angular/core';
import { FaqService } from './faq.service';
import { Faq } from '../models/faq';
import { FeedbackService } from '../footer/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent, PopupData } from '../popup/popup.component';
import { Feedback } from '../models/feedback';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  faqs!: Faq[];
  message?: string;
  email?: string;
  constructor(
    private faqService: FaqService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.faqService.getFaqs().subscribe((results) => {
      results.forEach((result) => {
        result.expanded = false;
      });
      this.faqs = results;
    });
  }
  expand(faq: Faq) {
    faq.expanded = !faq.expanded;
  }
  expandAll() {
    this.faqs.forEach((faq) => {
      faq.expanded = true;
    });
  }
  collapseAll() {
    this.faqs.forEach((faq) => {
      faq.expanded = false;
    });
  }
  submitFeedback() {
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      this.email = decryptedEmail;
      const data: PopupData = {
        title: 'Send Feedback',
        content: ['are you sure you want to send feedback:', this.message],
        positiveButton: 'Yes',
        negativeButton: 'No',
      };
      const dialogRef = this.dialog.open(PopupComponent, { data });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const feedback = new Feedback(this.message!, this.email!);
          this.feedbackService.postFeedback(feedback).subscribe();
          this.showSnackbarAction('your feedback is sent successfully', 'Done');
          this.message = ' ';
        } else {
          return;
        }
      });
    } else {
      alert('you need to login first');
    }
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
  }
  goToHome() {
    window.location.href = 'http://localhost:4201/home';
  }
}
