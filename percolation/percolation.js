let grid;
let gridDimension;
const SITE_SIZE = 10;
let gridElement = document.getElementById('grid');
const generateGridButton = document.getElementById('generateGridButton');


generateGridButton.addEventListener('click', (event) => {
    event.preventDefault();

    gridDimension = Number(document.getElementById('gridSize').value);
    grid = new Percolation(gridDimension)

    drowGrid(gridDimension);
})

gridElement.addEventListener('click', (event) => {
    const siteElement = event.target;
    const row = Number(siteElement.dataset.row);
    const col = Number(siteElement.dataset.col);

    grid.open(row, col);
    drowOpenSite(grid, row, col, gridDimension);
});

function generateOneSiteMarkup(row, col) {
    return `<div class="site" id="id_${row}-${col}" data-row="${row}" data-col="${col}"></div>`
}

class Percolation {
    constructor(gridSize) {
        const gridCellsCount = gridSize * gridSize;
        this.gridSize = gridSize;
        this.grid = new Array(gridSize);
        this.unionFindArray = new Array(gridCellsCount  + 2);
        this.treeSizes = new Array(gridCellsCount + 2);
        this.openSitesNumber = 0;
        this.virtualTopIndex = gridCellsCount + 1;
        this.virtualBottomIndex = gridCellsCount + 2;

        for (let i = 0; i < gridSize; i++) {
            this.grid[i] = [];

            for (let j = 0; j < gridSize; j++) {
                this.grid[i][j] = false;
            }
        }

        for (let i = 0; i < this.unionFindArray.length; i++) {
            this.unionFindArray[i] = i;
            this.treeSizes[i] = 1;
        }
    }

    open(row, col) {
        this.grid[row][col] = true;
        this.openSitesNumber++;
        const currentSiteIndex = this.convertSiteRowColToUnionFindIndex(row, col);

        if (row === 0) {
            this.connectSites(currentSiteIndex, this.virtualTopIndex);
        }

        if (row === this.gridSize - 1) {
            this.connectSites(currentSiteIndex, this.virtualBottomIndex);
        }

        const topSiteRow = row - 1;
        const bottomSiteRow = row + 1;
        const leftSiteCol = col - 1;
        const rightSiteCol = col + 1;
        let openedNeighbourIndex;

        if (topSiteRow >= 0 && this.isOpen(topSiteRow, col)) {
            openedNeighbourIndex = this.convertSiteRowColToUnionFindIndex(topSiteRow, col);
            this.connectSites(currentSiteIndex, openedNeighbourIndex);
        }

        if (bottomSiteRow < this.gridSize && this.isOpen(bottomSiteRow, col)) {
            openedNeighbourIndex = this.convertSiteRowColToUnionFindIndex(bottomSiteRow, col);
            this.connectSites(currentSiteIndex, openedNeighbourIndex);
        }

        if (leftSiteCol >= 0 && this.isOpen(row, leftSiteCol)) {
            openedNeighbourIndex = this.convertSiteRowColToUnionFindIndex(row, leftSiteCol);
            this.connectSites(currentSiteIndex, openedNeighbourIndex);
        }

        if (rightSiteCol < this.gridSize && this.isOpen(row, rightSiteCol)) {
            openedNeighbourIndex = this.convertSiteRowColToUnionFindIndex(row, rightSiteCol);
            this.connectSites(currentSiteIndex, openedNeighbourIndex);
        }
    }

    isOpen(row, col) {
        return this.grid[row][col];
    }

    isFull (row, col) {
        // check is connected to virtual top
        const currentSiteIndex = this.convertSiteRowColToUnionFindIndex(row, col);

        return this.isConnected(currentSiteIndex, this.virtualTopIndex);
    }

    numberOfOpenSites() {
        return this.numberOfOpenSites;
    }

    percolates() {
        // check if virtual bottom is connected to virual top
        return this.isConnected(this.virtualTopIndex, this.virtualBottomIndex);
    }

    convertSiteRowColToUnionFindIndex(row, col) {
        return this.gridSize * row + col;
    }

    findRoot(index) {
        while(this.unionFindArray[index] !== index) {
            this.unionFindArray[index] = this.unionFindArray[this.unionFindArray[index]];
            index = this.unionFindArray[index];
        }

        return index;
    }

    isConnected(index1, index2) {
        return this.findRoot(index1) === this.findRoot(index2);
    }

    connectSites(siteIndex1, siteIndex2) {
        const root1 = this.findRoot(siteIndex1);
        const root2 = this.findRoot(siteIndex2);

        if (root1 !== root2) {
            if (this.treeSizes[siteIndex1] < this.treeSizes[siteIndex2]) {
                this.unionFindArray[root1] = root2;
                this.treeSizes[siteIndex2] += this.treeSizes[siteIndex1];
            } else {
                this.unionFindArray[root2] = root1;
                this.treeSizes[siteIndex1] += this.treeSizes[siteIndex2];
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class PercolationStats {
    constructor(n, trials) {
        this.gridSize = n;
        this.trialsCount = trials;
        this.percolationThresholdArray = [];
    }

    // sample mean of percolation threshold
    mean() {
        return this.percolationThresholdArray.reduce((thresholdSum, threshold) => thresholdSum + threshold, 0) / this.trialsCount;
    }

    // sample standard deviation of percolation threshold
    stddev() {
        const mean = this.mean();

        const sum = this.percolationThresholdArray.reduce((thresholdSum, threshold) => {
            return thresholdSum + ((threshold - mean) ** 2) 
        }, 0)

        return Math.sqrt(sum / (this.trialsCount - 1));
    }

    // low endpoint of 95% confidence interval
    confidenceLo() {}

    // high endpoint of 95% confidence interval
    confidenceHi() {}

    calculate() {
        for (let i = 0; i < this.trialsCount; i++) {
            let openSites = 0;
            const percolation = new Percolation(this.gridSize);
            drowGrid(this.gridSize);

            while (!percolation.percolates()) {
                const row = getRandomInt(this.gridSize);
                const col = getRandomInt(this.gridSize);

                if (!percolation.isOpen(row, col)) {
                    percolation.open(row, col);
                    openSites++;
                    drowOpenSite(percolation, row, col, this.gridSize, 800);
                }
            }

            this.percolationThresholdArray.push(openSites / (this.gridSize * this.gridSize));
        }
    }
}

window.onload = () => {
    const test = new PercolationStats(30, 5);
    test.calculate();
    console.log(test.mean());
    console.log(test.stddev());
}

function drowGrid(gridDimension) {
    
    const gridTemplate = `repeat(${gridDimension}, ${SITE_SIZE}px)`;

    gridElement.style.gridTemplateRows = gridTemplate;
    gridElement.style.gridTemplateColumns = gridTemplate;

    let gridMarkup = '';

    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            gridMarkup += generateOneSiteMarkup(i, j);
        }
    }

    gridElement.innerHTML = gridMarkup;
}

function drowOpenSite(grid, row, col, gridSize) {
    const openSiteElement = document.getElementById(`id_${row}-${col}`);
    openSiteElement.classList.add('open-site');

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid.isFull(i, j)) {
                const fullyOpenedSiteElement = document.getElementById(`id_${i}-${j}`);
                fullyOpenedSiteElement.classList.add('full-open-site');
            }
        }
    }
}
