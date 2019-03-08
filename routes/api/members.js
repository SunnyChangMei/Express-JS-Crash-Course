const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//! Get all members
router.get('/', function (req, res) {
  res.json(members);
});

//! Get single member
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const found = members.some(member => member.id === parseInt(id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(id)));
  } else {
    res.status(400).json({
      msg: `No member with the id of ${id}`
    });
  }
});

//! Create Member
//* mongoDB or PostgreSQL or mySQL usually create ID for you
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({msg: 'please include a name and email'});
  }
  members.push(newMember);
  res.json(members);
});

//! Update Member
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const found = members.some(member => member.id === parseInt(id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(id)));
  } else {
    res.status(400).json({
      msg: `No member with the id of ${id}`
    });
  }
});

module.exports = router;
