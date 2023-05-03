import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ValidatorsService } from '../services/validators.service';
import { EntitiesService} from '../services/entities.service';
import { ChannelsService } from '../services/channels.service';
import { AnnouncementsService } from '../services/announcements.service';
import { SchedulesService } from '../services/schedules.service';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private validatorsService: ValidatorsService,
    private channelsService: ChannelsService,
    // private entitiesService: EntitiesService,
    private announcementsService: AnnouncementsService,
    private schedulesService: SchedulesService,

  ) { }

  ngOnInit(): void {

    // Wywołanie zapytań api
    this.authService.getAuth();
    this.profileService.getProfile();
    this.validatorsService.getValidatorProfile();
    // this.validatorsService.getValidatorAnnouncements();
    // this.entitiesService.getEntitiesAllowed();
    this.channelsService.getChannels();
    this.announcementsService.getAnnouncements();
    this.schedulesService.getSchedules();

    // Subskrybcja do informacji które następnie przekazywane są inputem w dół
    this.profileService.profile.subscribe(profile => this.profile = profile)
    this.validatorsService.validatorProfile.subscribe(validatorProfile => this.validatorProfile = validatorProfile)
    this.validatorsService.validatorAnnouncements.subscribe(validatorAnnouncements => this.validatorAnnouncements = validatorAnnouncements)
    // this.entitiesService.entitiesEvents.subscribe(entitiesEvents => this.entitiesEvents = entitiesEvents)
    // this.entitiesService.entitiesAllowed.subscribe(entitiesAllowed => this.entitiesAllowed = entitiesAllowed)
    this.channelsService.channels.subscribe(channels => this.channels = channels)
    this.announcementsService.announcements.subscribe(announcements => this.announcements = announcements)
    this.schedulesService.schedules.subscribe(schedules => this.schedules = schedules)

  }

  // Zmienne do subskrypcji
  profile: any;
  validatorProfile: any;
  validatorAnnouncements: any;
  validatorSchedules: any;
  entitiesEvents: any;
  entitiesAllowed: any;
  channels: any;
  announcements: any;
  schedules: any;




}
