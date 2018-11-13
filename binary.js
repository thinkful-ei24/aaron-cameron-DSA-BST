class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.valule = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      return "Key does not exist";
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const newNode = this.right._findMin();
        this.key = newNode.key;
        this.value = newNode.value;
        newNode.remove(newNode.key);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      return "The key does not exist";
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    } else {
      return this.left._findMin();
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
}

function main() {
  let bst = new BinarySearchTree();

  let newItems = [10, 5, 6, 4, 20, 7, 30, 50, 67, 89, 109];
  newItems.forEach(item => bst.insert(item));

  function height(node) {
    if (!node) return 0;
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  let testBST = new BinarySearchTree();
  let test2 = new BinarySearchTree();
  let test3 = new BinarySearchTree();
  test3.insert(2);
  test2.insert(10);
  testBST.insert(5);
  testBST.left = test3;
  testBST.right = test2;

  function isItBST(bst) {
    if (bst.left) {
      if (bst.left.key < bst.key) {
        return isItBST(bst.left);
      } else {
        return false;
      }
    }
    if (bst.right) {
      if (bst.right.key > bst.key) {
        return isItBST(bst.right);
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  //   console.log(isItBST(testBST));

  function findMax(bst) {
    if (!bst.right) {
      return bst;
    } else {
      return findMax(bst.right);
    }
  }

  function thirdLargest(bst) {
    let ourBST = bst;
    let max = findMax(ourBST);
    ourBST.remove(max.key);
    let max2 = findMax(ourBST);
    ourBST.remove(max2.key);
    let solution = findMax(ourBST);
    return solution.key;
  }

  function balanced(bst) {
    let left = height(bst.left);
    let right = height(bst.right);
    if (Math.abs(left - right) > 1) {
      return false;
    } else {
      return;
    }
  }
  // console.log(balanced(bst));

  function balancedBST(bst) {
    if (balanced(bst) === false) {
      return false;
    }
    if (balanced(bst) !== false) {
      if (bst.left && bst.right) {
        return balancedBST(bst.left), balancedBST(bst.right);
      } else if (bst.left) {
        let child = bst.left;
        if (child.right || child.left) {
          return false;
        } else {
          return true;
        }
      } else if (bst.right) {
        let child = bst.right;
        if (child.right || child.left) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  return balancedBST(bst);
}

console.log(main());
