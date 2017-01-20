import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Comic }     from '../../models/comic';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

	comic: Comic;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.comic = navParams.get('comic');
	}

}
