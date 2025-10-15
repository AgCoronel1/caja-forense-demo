import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from './_core/services/product.service';
import { SHARED_IMPORTS } from './shared/shared-imports';
import { SpinnerService } from './_core/services/spinner.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [
    ProductService,
  ]
})


export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  isOpen = false;
  drawerWidth = 250;
  pageTitle = 'Inicio'; 

  constructor(private router: Router,
              private spinner: SpinnerService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      if (url.includes('productos')) this.pageTitle = 'Productos';
      else if (url.includes('acerca')) this.pageTitle = 'Acerca de';
      else this.pageTitle = 'Inicio';
    });
  }

  openDrawer() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.drawer.open();
    }
  }

  closeDrawer() {
    if (this.isOpen) {
      this.isOpen = false;
      this.drawer.close();
    }
  }

  toggleDrawer() {
    this.isOpen ? this.closeDrawer() : this.openDrawer();
  }

  get contentMargin() {
    return this.isOpen ? this.drawerWidth + 'px' : '0px';
  }
}
