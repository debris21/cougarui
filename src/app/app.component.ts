import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'UI'; 
  generatePDF() {
    const element = document.getElementById('your-html-element-id'); // Replace with your HTML element's ID
    const pdfOptions = {
      margin: 10,
      filename: 'your-filename.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  }
}
