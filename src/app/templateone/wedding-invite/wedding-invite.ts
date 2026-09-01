import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { CoupleStory } from '../couple-story/couple-story';
import { TempleSection } from '../temple-section/temple-section';
import { WeddingDetails } from '../wedding-details/wedding-details';
import { Gallery } from '../gallery/gallery';
import { InvitationSection } from '../invitation-section/invitation-section';
import { Countdown} from '../countdown/countdown';
@Component({
  selector: 'app-wedding-invite',
  imports: [Hero, CoupleStory, TempleSection, WeddingDetails, Gallery, InvitationSection, Countdown ],
  templateUrl: './wedding-invite.html',
  styleUrl: './wedding-invite.scss',
})
export class WeddingInvite {

}
