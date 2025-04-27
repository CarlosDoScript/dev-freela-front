import { Component, Input } from '@angular/core';
import { LdHeaderComponent } from '../../../shared/components/ld-header/ld-header.component';
import { TLdWrapperCol } from './types/ld-wrapper-types';
import { CommonModule } from '@angular/common';
import { Navigation } from '@app/shared/utils/navigation';

@Component({
  standalone: true,
  selector: 'app-ld-wrapper',
  imports: [
    LdHeaderComponent,
    CommonModule
  ],
  templateUrl: './ld-wrapper.component.html',
  styleUrl: './ld-wrapper.component.scss'
})
export class LdWrapperComponent {
  @Input() type: TLdWrapperCol = 'two-col';
  @Input() back: string = '';

  constructor(public navigation: Navigation){}

}
