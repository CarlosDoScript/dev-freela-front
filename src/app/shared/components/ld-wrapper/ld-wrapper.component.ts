import { Component, Input } from '@angular/core';
import { LdHeaderComponent } from '../../../shared/components/ld-header/ld-header.component';
import { TLdWrapperCol } from './types/ld-wrapper-types';


@Component({
  standalone: true,
  selector: 'app-ld-wrapper',
  imports: [
    LdHeaderComponent
  ],
  templateUrl: './ld-wrapper.component.html',
  styleUrl: './ld-wrapper.component.scss'
})
export class LdWrapperComponent {
  @Input() type: TLdWrapperCol = 'two-col';
}
