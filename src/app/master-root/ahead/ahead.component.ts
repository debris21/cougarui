import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ahead',
  templateUrl: './ahead.component.html'
})
export class AheadComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  btnToggle() {
    const body = document.body;
    if (body.classList.contains('dark')) {
      this.renderer.removeClass(body, 'dark');
    } else {
      this.renderer.addClass(body, 'dark');
    }
  }
}
