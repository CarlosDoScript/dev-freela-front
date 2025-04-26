import { Component } from '@angular/core';
import { LdHeaderComponent } from '../../../shared/components/ld-header/ld-header.component';

@Component({
  standalone: true,
  selector: 'app-ld-wrapper',
  imports: [LdHeaderComponent],
  templateUrl: './ld-wrapper.component.html',
  styleUrl: './ld-wrapper.component.scss'
})
export class LdWrapperComponent {

}
