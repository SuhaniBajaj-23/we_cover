// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations 
{
    int bal;

    constructor() public {
        bal = 0;
    }

    function getCredits() public view returns (int) {
        return bal;
    }

    function addCredits(int amt) public {
        bal = bal + amt;
    }

    function redeemCredits(int mon) public{
        bal = bal-mon;
    }
    address  public owner =  msg.sender;

  uint  public last_completed_migration;
    modifier  restricted() {
      require(msg.sender == owner,"This function is restricted to the contract's owner");
      _;
    }
    
  function  setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
