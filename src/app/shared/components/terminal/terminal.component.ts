import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TerminalLine {
  type: 'typing' | 'animated';
  content: string;
  className?: string;
  duration?: number;
  delay?: number;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() lines: TerminalLine[] = [];
  @Input() sequence: boolean = true;
  @Input() startOnView: boolean = true;
  @Input() className: string = '';

  @ViewChild('terminalContainer') terminalContainer!: ElementRef;

  displayedLines: { content: string; className: string; isTyping: boolean; displayedText: string }[] = [];
  private observer?: IntersectionObserver;
  private hasStarted = false;

  ngOnInit(): void {
    if (!this.startOnView) {
      this.startSequence();
    }
  }

  ngAfterViewInit(): void {
    if (this.startOnView) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasStarted) {
            this.hasStarted = true;
            this.startSequence();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.terminalContainer) {
      this.observer.observe(this.terminalContainer.nativeElement);
    }
  }

  private async startSequence(): Promise<void> {
    let cumulativeDelay = 0;

    for (const line of this.lines) {
      const lineIndex = this.displayedLines.length;
      
      if (line.type === 'typing') {
        this.displayedLines.push({
          content: line.content,
          className: line.className || '',
          isTyping: true,
          displayedText: ''
        });

        await this.delay(cumulativeDelay + (line.delay || 0));
        await this.typeText(lineIndex, line.content, line.duration || 60);
        cumulativeDelay = 0;
      } else {
        this.displayedLines.push({
          content: line.content,
          className: line.className || '',
          isTyping: false,
          displayedText: line.content
        });

        await this.delay(cumulativeDelay + (line.delay || 0));
        cumulativeDelay = 500;
      }
    }
  }

  private async typeText(lineIndex: number, text: string, duration: number): Promise<void> {
    for (let i = 0; i <= text.length; i++) {
      this.displayedLines[lineIndex].displayedText = text.substring(0, i);
      await this.delay(duration);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}