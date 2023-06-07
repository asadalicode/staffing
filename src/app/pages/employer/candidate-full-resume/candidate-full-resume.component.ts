import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrimTextPipe } from '@app/@shared/pipes/trim-text.pipe';

@Component({
  selector: 'app-candidate-full-resume',
  templateUrl: './candidate-full-resume.component.html',
  styleUrls: ['./candidate-full-resume.component.scss'],
  providers: [TrimTextPipe] // Declare TrimPipe as a provider
})
export class CandidateFullResumeComponent {

  totalCandidates = 32;
  currentCandiate = 1;
 
  aboutText: string = `Dedicated and detail-oriented dental assistant with over 5 years of experience in providing clinical and administrative support to dentists and patients.Proficient in managing patient records, preparing dental materials, and sterilising equipment. Committed to promoting oral health and providing a positive patient experience.
Amet consectetur. Phasellus quis sit in nibh natoque nisl. Quis enim vel tempus quis. Mauris urna tincidunt viverra cras rutrum tincidunt in bibendum. Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.
Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.
Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate

Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Amet consectetur. Phasellus quis sit in nibh natoque nisl. Quis enim vel tempus quis. Mauris urna tincidunt viverra cras rutrum tincidunt in bibendum. Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.

Amet consectetur. Phasellus quis sit in nibh natoque nisl. Quis enim vel tempus quis. Mauris urna tincidunt viverra cras rutrum tincidunt in bibendum. Praesent odio risus lorem aliquet mi. Sagittis fermentum ullamcorper purus non elit. Risus sem leo orci leo donec sed nam. In pellentesque massa dignissim sagittis gravida quis augue. Sagittis neque nec aenean libero libero. Vel consectetur fermentum cursus tristique vulputate.`;
  
  
  constructor(
    public dialogRef: MatDialogRef<CandidateFullResumeComponent>,
    public trimPipe: TrimTextPipe) { }


  prevCandidate() {
    if (this.currentCandiate > 1) {
      this.currentCandiate -= 1;
    }
  }

  nextCandidate() {
    if (this.totalCandidates > this.currentCandiate) {
      this.currentCandiate += 1;
    }
  }


  toggelLongText(key: string) {
    this.trimPipe.toggleText(key);
  }
}
