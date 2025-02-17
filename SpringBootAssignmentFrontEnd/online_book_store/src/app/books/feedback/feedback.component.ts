import { Component } from '@angular/core';
import { Feedback } from '../../model/feedback';
import { FeedbackService } from '../../service/feedback.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  userName: string = '';
  feedback: Feedback = new Feedback(0, '', '', 0, '',false);

  selectedRating: number | null = null;
  hoveredRating: number | null = null;

  constructor(private feedbackService: FeedbackService, private router:Router) {}

  setFeedbackRating(value: number): void {
    this.selectedRating = value;
    this.hoveredRating = null;
  }

  setHoveredRating(value: number): void {
    this.hoveredRating = value;
  }

  clearHoveredRating(): void {
    this.hoveredRating = null;
  }

  onSubmit(): void {
    if (this.selectedRating !== null) {
      this.feedback.feedbackRating = this.selectedRating.toString();
      this.feedback.recommend = this.feedback.recommend;
      console.log("reccomehjj",this.feedback.recommend);
      console.log("rathdkj",this.feedback.feedbackRating);
      
  
      const userId = Number(sessionStorage.getItem('userId'));
      if (userId !== null) {
        // const userData = JSON.parse(userId);
        // this.feedback.userName = this.userName;
  
        this.feedbackService.addFeedback(this.feedback, userId)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Thank You!',
              text: 'Your feedback has been submitted successfully.',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/user/home']);
              }
            });
            
         
            this.feedback = new Feedback(0,"","", 0, "",false);
            this.selectedRating = null;
          }, error => {
            console.error('Error adding feedback:', error.error);
          });
      } else {
        console.error('User data not found in session');
      }
    } else {
      console.error('Please select a rating');
    }
  }

}
