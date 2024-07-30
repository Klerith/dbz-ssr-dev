import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DragonBallService } from '../../modules/dragonball/services/dragonball.service';
import { firstValueFrom, map, tap } from 'rxjs';
import {
  BasicCharacter,
  Links,
  PaginationMeta,
} from '../../modules/dragonball/interfaces';
import { CharacterCardComponent } from '../../modules/dragonball/components/character-card/character-card.component';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'characters-page',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './characters-page.component.html',
})
export default class CharactersPageComponent {
  private dragonballService = inject(DragonBallService);
  private title = inject(Title);
  private meta = inject(Meta);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentPage = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => +page)
    ),
    {
      initialValue: 1,
    }
  );

  public characters = signal<BasicCharacter[]>([]);

  public pageLinks = signal<Links>({
    first: '',
    previous: '',
    next: '',
    last: '',
  });

  public pageInfo = signal<PaginationMeta>({
    currentPage: 1,
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalPages: 0,
  });

  // public characters

  // Load the first page of characters
  private loadPageEffect = effect(async () => {
    const { items, links, meta } = await firstValueFrom(
      this.dragonballService.loadPage(this.currentPage())
    );
    this.characters.set(items);
    this.pageInfo.set(meta);
    console.log({ items, links, meta });

    if (items.length === 0) {
      this.router.navigate(['/characters/page', 1]);
    }
  });

  // Set metadata for the page
  private setMetaEffect = effect(() => {
    this.title.setTitle(`Page ${this.currentPage()} : Dragon Ball Characters`);
    this.meta.updateTag({
      name: 'description',
      content: 'Listado de personajes de Dragon Ball',
    });
    this.meta.updateTag({
      name: 'og:image',
      content: this.characters()[0]?.image,
    });
  });

  public loadPageByPage(page: number) {
    console.log(page);
    if (page === 0) return;
    if (page > this.pageInfo().totalPages) return;

    this.router.navigate(['/characters/page', page]);
  }
}
