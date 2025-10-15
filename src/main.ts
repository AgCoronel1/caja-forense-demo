import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient , withInterceptorsFromDi  } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SpinnerService } from './app/_core/services/spinner.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

export class SpanishPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Ítems por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? 
      Math.min(startIndex + pageSize, length) : 
      startIndex + pageSize;
    
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    SpinnerService,
    { provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl }
  ]
}).catch(err => console.error(err));