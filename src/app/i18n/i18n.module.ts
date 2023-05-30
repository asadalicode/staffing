import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LanguageSelectorComponent } from './language-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MatMenuModule, MatIconModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
})
export class I18nModule {}
