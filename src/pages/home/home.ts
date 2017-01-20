import { Component } from '@angular/core';

import { NavController, LoadingController, Loading } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { ComicService } from '../../providers/comic-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ComicService]
})

export class HomePage {

	  comics: any[] = [];
    fetching: boolean;
    queryString: string;
    queryComics: any[] = [];
    errorMessage: any[];
    loader: Loading;

  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public comicService: ComicService) {
      this.presentLoading();
  		this.loadComics();
  	}

    getComics() {
      if(this.queryString && this.queryString.length > 0){
        return this.queryComics;
      }
      else{
        return this.comics;
      }
    }

    presentLoading() {
      this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
      this.loader.present();
    }

    loadComics(){
      this.fetching = true;
      this.comicService.getComics().subscribe(
        comics => {
          this.comics = comics;
          this.fetching = false;
          this.loader.dismiss();
        },
        error => this.errorMessage = <any>error
      );
    }

    loadMoreComics(infiniteScroll) {
      this.fetching = true;
      this.comicService.getComics(this.getComics().length, 10, this.queryString).subscribe(
        comics => {
          this.getComics().push.apply(this.getComics(), comics);
          this.fetching = false;
          infiniteScroll.complete();
        },
        error => this.errorMessage = <any>error
      );
    }

  	comicSelected(comic){
  		this.navCtrl.push(DetailPage, {
  			comic: comic
  		});
  	}

    onInput(searchBar) {
      // set queryString to the value of the searchbar
      this.queryString = searchBar.target.value;
      this.fetching = true;
      // if queryString is an empty string don't filter the items
      if (this.queryString && this.queryString.trim() != '') {
        this.comicService.getComics(0, 10, this.queryString).subscribe(
          comics => {
            this.queryComics = comics;
            this.fetching = false;
          },
          error => this.errorMessage = <any>error
        );
      }
      else{
        this.queryString = null;
        this.fetching = false;
        this.queryComics = [];
      }
    }

    onCancel(searchBar) {
      // Empty query related fields
      this.queryString = null;
      this.fetching = false;
      this.queryComics = [];
    }

}
