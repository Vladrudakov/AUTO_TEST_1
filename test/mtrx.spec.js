const { expect } = require('chai');
const Mtrx = require('mtrx');

describe('Mtrx library', () => {
  it('creates basic matrices with expected dimensions and values', () => {
    const zeros = Mtrx.zeros(2, 3);
    const ones = Mtrx.ones(2, 2);
    const identity = Mtrx.eye(3);
    const diagonal = Mtrx.diag([2, 4, 6]);

    expect(zeros.rows).to.equal(2);
    expect(zeros.cols).to.equal(3);
    expect(zeros.get(1, 2)).to.equal(0);

    expect(ones.get(0, 1)).to.equal(1);
    expect(ones.get(1, 1)).to.equal(1);

    expect(identity.get(0, 0)).to.equal(1);
    expect(identity.get(0, 1)).to.equal(0);
    expect(identity.get(2, 2)).to.equal(1);

    expect(diagonal.get(0, 0)).to.equal(2);
    expect(diagonal.get(1, 1)).to.equal(4);
    expect(diagonal.get(2, 2)).to.equal(6);
  });

  it('creates a matrix from nested arrays and transposes it correctly', () => {
    const matrix = new Mtrx([
      [1, 2, 3],
      [4, 5, 6],
    ]);

    expect(matrix.rows).to.equal(2);
    expect(matrix.cols).to.equal(3);
    expect(matrix.get(1, 2)).to.equal(6);

    const transposed = matrix.T();
    expect(transposed.rows).to.equal(3);
    expect(transposed.cols).to.equal(2);
    expect(transposed.get(0, 1)).to.equal(4);
    expect(transposed.get(2, 0)).to.equal(3);
  });

  it('calculates determinant and rank for a simple numeric matrix', () => {
    const matrix = new Mtrx([
      [1, 2],
      [3, 4],
    ]);

    expect(matrix.det).to.equal(-2);
    expect(matrix.rank).to.equal(2);
  });

  it('supports addition and multiplication operations', () => {
    const a = new Mtrx([
      [1, 2],
      [3, 4],
    ]);
    const b = new Mtrx([
      [5, 6],
      [7, 8],
    ]);

    const sum = Mtrx.add(a, b);
    expect(sum.get(0, 0)).to.equal(6);
    expect(sum.get(0, 1)).to.equal(8);
    expect(sum.get(1, 0)).to.equal(10);
    expect(sum.get(1, 1)).to.equal(12);

    const identity = Mtrx.eye(2);
    const product = Mtrx.mul(a, identity);
    expect(product.get(0, 0)).to.equal(1);
    expect(product.get(0, 1)).to.equal(2);
    expect(product.get(1, 0)).to.equal(3);
    expect(product.get(1, 1)).to.equal(4);

    const same = a.leftMul(identity);
    expect(same.get(0, 1)).to.equal(2);
    expect(same.get(1, 1)).to.equal(4);
  });

  it('recognizes matrix objects and matrix-like values', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]]);
    const plainArray = [[1, 2], [3, 4]];

    expect(Mtrx.isMtrx(matrix)).to.equal(true);
    expect(Mtrx.isMtrx(plainArray)).to.equal(false);
    expect(Mtrx.isMtrxLike(plainArray)).to.equal(true);
    expect(Mtrx.isSameShape(matrix, plainArray)).to.equal(true);
  });
});
