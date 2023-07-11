import { Component, HostBinding, HostListener } from '@angular/core';
import { SearchResult } from '../../model/share/search-result.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isNavbarOpen: boolean = false;
  isDropdownOpen: boolean = false;
  isDarkMode: boolean = false;
  isHeaderFixed: boolean = false;
  isScrolled: boolean = false;
  isLoggedIn: boolean = false; // Track login status
  searchQuery: string = ''; // Store the search query
  searchResults: SearchResult[] = []; // Store the search results

  constructor(private router: Router) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isHeaderFixed = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 0;
    this.isScrolled = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 0;
  }

  @HostBinding('class.dark-mode') get darkModeClass() {
    return this.isDarkMode;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  preventDropdownItemClick(event: Event) {
    event.stopPropagation();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  logout(): void {
    this.isLoggedIn = false; // Set login status to false
    // Additional logout logic here if needed
  }

  onSearchSubmit() {
    if (this.searchQuery.trim() !== '') {
      // Perform search operation based on the search query
      // and update the searchResults array
      // For example, you can navigate to the result page with the search query as a parameter
      this.router.navigate(['/result'], { queryParams: { query: this.searchQuery } });
    }
  }

  getLogoSrc(): string {
    if (this.isDarkMode) {
      return 'https://www.cgs-cimb.com/cgscimbresources/system/footer_logo.svg';
    } else if (this.isScrolled) {
      return 'https://www.cgs-cimb.com/cgscimbresources/system/footer_logo.svg';
    } else {
      return 'https://www.cgs-cimb.com/cgscimbresources/system/logo.svg';
    }
  }
}
