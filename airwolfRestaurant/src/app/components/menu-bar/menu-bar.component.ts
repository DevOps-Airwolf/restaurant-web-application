import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../../services/service.component';
import { MenuSections, SectionMenuList, Item, UserOrder } from 'src/app/models/menu-bar.model';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  public isLoading: boolean = true;
  public title: String = "Menu Bar";
  public snackItems: Item [];
  public mainCourseItems: Item [];
  public dessertItems: Item [];
  public beverageItems: Item [];
  public menuResult: MenuSections;
  public userOrder: String[] = [];

  constructor(private httpService: ServiceComponent) { }

  ngOnInit(): void {
    this.httpService.getMenuSections().subscribe((response: MenuSections) => {
      this.menuResult = response;
      this.loadMenuSections();
    });
  }

  private loadMenuSections(){
    console.log("Menu Sections: ", this.menuResult);
    this.loadSnackItems();
    this.loadMainCourseItems();
    this.loadDessertItems();
    this.loadBeverageItems();
    setTimeout(() => { this.isLoading = false }, 4000);
  }

  private loadSnackItems(){
    this.httpService.getSectionMenuList(0).subscribe((response: SectionMenuList) => {
      this.snackItems = response.items;
    });
  }

  private loadMainCourseItems(){
    this.httpService.getSectionMenuList(1).subscribe((response: SectionMenuList) => {
      this.mainCourseItems = response.items;
    });
  }

  private loadDessertItems(){
    this.httpService.getSectionMenuList(2).subscribe((response: SectionMenuList) => {
      this.dessertItems = response.items;
    });
  }

  private loadBeverageItems(){
    this.httpService.getSectionMenuList(3).subscribe((response: SectionMenuList) => {
      this.beverageItems = response.items;
    });
  }

  public addToMenu(itemName){
    this.userOrder.push(itemName);
    console.log(this.userOrder);
    alert(itemName + " added to your order.");
  }

  public removeFromMenu(itemName){
    this.userOrder.pop();
    console.log(this.userOrder);
    alert(itemName + " removed from your order.");
  }

  public placeOrder(){
    console.log(this.userOrder);
    if(this.userOrder.length == 0){
      alert("Your order is empty.");
    }else{
      this.httpService.placeUserOrder(this.userOrder.toString()).subscribe((response: any) => {
        console.log(response);
      });
      alert("Successfully placed your order!");
    }
  }

}
