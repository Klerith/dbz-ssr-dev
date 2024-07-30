import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { BasicCharacter } from '../../interfaces';

@Component({
  selector: 'dragonball-character-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent {
  public character = input.required<BasicCharacter>();
}
