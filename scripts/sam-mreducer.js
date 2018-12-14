//Sorting function
function matrixSort(a, b) {
	let aZeros = 0;
	let bZeros = 0;
	for (let element of a) if (element === 0) aZeros++;
	for (let element of b) if (element === 0) bZeros++;
	if (aZeros < bZeros) return -1;
	if (aZeros > bZeros) return 1;
	return 0;
}

function reduce(n, matrix) {
	//Find first non-zero element in the first row
	let anchor = {};
	for (let i = 0; i < matrix[n].length; i++)
		if (matrix[n][i] !== 0) {
			anchor.val = matrix[n][i];
			anchor.i = n;
			anchor.j = i;
			break;
		}
	//Reduce it to 1 by dividing the whole row by that anchor
	if (anchor.val !== undefined)
		matrix[n] = matrix[n].map(e => e / anchor.val);

	//Reduce all values below anchor to 0
	for (let i = anchor.i + 1; i < matrix.length; i++) {
		element = matrix[i][anchor.j];
		for (let x = 0; x < matrix[i].length; x++) {
			matrix[i][x] = matrix[i][x] - element * matrix[anchor.i][x];
		}
	}
}

function completeReduce(matrix) {
	//Reduce all element above the leading 1 to 0
	let reducer;
	for (let i = 1; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			let level = 0;
			//Get the leading 1
			if (matrix[i][j] === 1) {
				level = i - 1;
				//climb up until the first row
				do {
					//Reducer is a element above 1 that will be used for row reduction and later reduced to 0
					reducer = matrix[level][j];
					//Row reduction
					for (let x = 0; x < matrix[level].length; x++) {
						matrix[level][x] -= reducer * matrix[i][x];
					}
					level = level - 1;
				} while (level >= 0);
				break;
			}
		}
	}
}

function MatrixReduce(input) {
	const matrix = [];
	let args = input.split(".");
	const rows = args[0];
	const cols = args[1];
	args = args.slice(2);

	console.log(rows, cols, args);

	for (let i = 0; i < rows; i++) {
		const row = args.slice(0, cols);
		if (row.length === 0) {
			return false;
		}
		args = args.slice(cols);
		matrix.push(row);
	}
	//Sort first
	matrix.sort(matrixSort);

	//Reduce
	for (let n = 0; n < matrix.length; n++) reduce(n, matrix);
	completeReduce(matrix);
	//Sort once again if all 0 rows are not at the bottom of the matrix
	matrix.sort();
	for (let row of matrix) {
		row = row.map(e => e.toPrecision(2));
		console.log(row);
	}
	return matrix;
}

module.exports = MatrixReduce;
