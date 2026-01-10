import { Component } from '@angular/core';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center gap-4 mb-12">
      <div class="flex-1 h-px bg-white/10"></div>
      <span class="text-xs text-gray-500">•</span>
      <div class="flex-1 h-px bg-white/10"></div>
    </div>
  `,
  styles: []
})
export class SeparatorComponent { 
}