import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ld-button',
  imports: [],
  templateUrl: './ld-button.component.html',
  styleUrl: './ld-button.component.scss'
})
export class LdButtonComponent {
  @Input() text: string = '';
}
