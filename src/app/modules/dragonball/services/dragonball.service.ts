import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DragonBallPaginated } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DragonBallService {
  private http = inject(HttpClient);

  public loadPage(page: number) {
    const url = `https://dragonball-api.com/api/characters`; // page=1

    return this.http.get<DragonBallPaginated>(url, {
      params: {
        page: page.toString(),
      },
    });
  }
}
