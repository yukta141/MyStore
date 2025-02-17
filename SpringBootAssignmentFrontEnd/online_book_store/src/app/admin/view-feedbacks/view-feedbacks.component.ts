import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../model/feedback';
import { FeedbackService } from '../../service/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrl: './view-feedbacks.component.css'
})
export class ViewFeedbacksComponent{

  feedbacks: Feedback[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private feedbackService: FeedbackService) {
    this.getAllFeedback();
  }

  getAllFeedback(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (response) => {
        this.feedbacks = response.reverse();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get paginatedFeedbacks(): Feedback[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.feedbacks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.feedbacks.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  deleteFeedback(feedbackId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this feedback?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.feedbackService.deleteFeedback(feedbackId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
            this.getAllFeedback();
          },
          (error) => {
            Swal.fire('Error!', 'There was an error deleting the feedback.', 'error');
          }
        );
      }
    });
  }
}
