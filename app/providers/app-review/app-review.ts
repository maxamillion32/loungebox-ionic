import { LaunchReview } from 'ionic-native';
import { Platform } from 'ionic-angular';
@Injectable()
export class LoungeWeb {
  private db;
  //log : Logger1;
  constructor(private platform: Platform,
    private utils: Utils,
    private log: Logger1,
    private settings: LbcSettings
  ) {

  }

  launchReview() {

    const appId: string = 'yourAppId';
    LaunchReview.launch(appId)
      .then(() => console.log('Successfully launched store app');
  }

}
