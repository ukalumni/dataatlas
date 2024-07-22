import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import cytoscape from 'cytoscape';

@Component({
  selector: 'app-data-atlas-page',
  standalone: true,
  templateUrl: './data-atlas-page.component.html',
  styleUrls: ['./data-atlas-page.component.css']
})
export class DataAtlasPageComponent implements OnInit {
  data: any;
  cy: any;
  currentColumnsAndEdges: cytoscape.CollectionReturnValue | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['data'] || { elements: [] };
  }

  ngOnInit(): void {
    console.log("Data passed to Cytoscape:", this.data); // Log the data to verify it
    this.initCytoscape();
  }

  initCytoscape(): void {
    const container = document.getElementById('cy');
    if (!container) {
      console.error('Cytoscape container not found');
      return;
    }

    this.cy = cytoscape({
      container,
      elements: this.data.elements,
      style: [
        {
          selector: 'node[type="table"]',
          style: {
            'background-color': '#6FB1FC',
            'label': 'data(label)',
            'shape': 'round-rectangle',
            'width': '200px',
            'height': '50px',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        },
        {
          selector: 'edge[type="relationship"], edge[type="column-relationship"]',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: 'node[type="column"]',
          style: {
            'background-color': '#EDA1ED',
            'label': 'data(label)',
            'shape': 'rectangle',
            'width': '150px',
            'height': '30px',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      }
    });

    // Initialize currentColumnsAndEdges after Cytoscape is instantiated
    this.currentColumnsAndEdges = this.cy.collection();

    // Add event listener for node clicks to zoom in on the clicked node and fetch columns
    this.cy.on('tap', 'node[type="table"]', (evt: cytoscape.EventObject) => this.onTableNodeClick(evt));
  }

  onTableNodeClick(evt: cytoscape.EventObject): void {
    const node = evt.target;
    const tableName = node.data('label');

    // Zoom in on the clicked node
    this.cy.animate({
      fit: {
        eles: node,
        padding: 350 // Increase padding to zoom out slightly more
      },
      duration: 500
    });

    // Fetch columns for the clicked table
    this.http.post<any>('http://localhost:8000/api/columns', { table: tableName }).subscribe(
      response => {
        // Remove the currently displayed columns and edges
        if (this.currentColumnsAndEdges && this.currentColumnsAndEdges.length > 0) {
          this.cy.remove(this.currentColumnsAndEdges);
        }

        // Add new columns and edges to the Cytoscape graph
        this.currentColumnsAndEdges = this.cy.add(response.elements);

        // Ensure currentColumnsAndEdges is not null
        if (this.currentColumnsAndEdges) {
          // Position columns around the selected table
          const tablePosition = node.position();
          const radius = 200; // Distance from the table to the columns
          const angleStep = (2 * Math.PI) / this.currentColumnsAndEdges.length;

          this.currentColumnsAndEdges.forEach((ele, i) => {
            if (ele.isNode()) {
              const angle = i * angleStep;
              ele.position({
                x: tablePosition.x + radius * Math.cos(angle),
                y: tablePosition.y + radius * Math.sin(angle)
              });
            }
          });

          // Optional: Fit the view to the updated graph without zooming in too much
          this.cy.fit(this.cy.nodes().filter('[type="table"], [type="column"]'), 50);
        }
      },
      error => {
        console.error('Error fetching columns:', error);
      }
    );
  }
}
