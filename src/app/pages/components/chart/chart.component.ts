import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @Input() slotIndex: number;  // Slot index input
  @Input() chartData: number[] = [];  // Contribution data for this slot
  @Input() chartLabel: string = 'Slot Chart';  // Chart title


  months : any = [
    { "id": 1, "name": "January" },
    { "id": 2, "name": "February" },
    { "id": 3, "name": "March" },
    { "id": 4, "name": "April" },
    { "id": 5, "name": "May" },
    { "id": 6, "name": "June" },
    { "id": 7, "name": "July" },
    { "id": 8, "name": "August" },
    { "id": 9, "name": "September" },
    { "id": 10, "name": "October" },
    { "id": 11, "name": "November" },
    { "id": 12, "name": "December" }
  ]

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    console.log(this.slotIndex)
    console.log(this.chartData)
    console.log(this.chartLabel)
    if (!this.chartData || this.chartData.length === 0) {
      console.warn(`No data for slot ${this.slotIndex}`);
      return; // Prevent rendering an empty chart
    }

    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months.map(month => month.name), // Month numbers
        datasets: [
          {
            label: this.chartLabel,
            data: this.chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Red
              'rgba(54, 162, 235, 0.2)', // Blue
              'rgba(255, 206, 86, 0.2)', // Yellow
              'rgba(75, 192, 192, 0.2)', // Green
              'rgba(153, 102, 255, 0.2)', // Purple
              'rgba(255, 159, 64, 0.2)', // Orange
              'rgba(255, 99, 132, 0.2)', // Red
              'rgba(54, 162, 235, 0.2)', // Blue
              'rgba(255, 206, 86, 0.2)', // Yellow
              'rgba(75, 192, 192, 0.2)', // Green
              'rgba(153, 102, 255, 0.2)', // Purple
              'rgba(255, 159, 64, 0.2)' // Orange
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 12,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  getColor(index: number): string {
    const colors = [
      'rgba(255, 99, 132, 0.2)', // Red
      'rgba(54, 162, 235, 0.2)', // Blue
      'rgba(255, 206, 86, 0.2)', // Yellow
      'rgba(75, 192, 192, 0.2)', // Green
      'rgba(153, 102, 255, 0.2)', // Purple
      'rgba(255, 159, 64, 0.2)'  // Orange
    ];
    return colors[index % colors.length];
  }

  getBorderColor(index: number): string {
    const colors = [
      'rgba(255, 99, 132, 1)', // Red
      'rgba(54, 162, 235, 1)', // Blue
      'rgba(255, 206, 86, 1)', // Yellow
      'rgba(75, 192, 192, 1)', // Green
      'rgba(153, 102, 255, 1)', // Purple
      'rgba(255, 159, 64, 1)'  // Orange
    ];
    return colors[index % colors.length];
  }
}
