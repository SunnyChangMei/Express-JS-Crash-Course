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
  const found = members.some(member => member.id === Number(id));
  if (found) {
    res.json(members.filter(member => member.id === Number(id)));
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
    return res.status(400).json({
      msg: 'please include a name and email'
    });
  }
  members.push(newMember);
  res.json(members);
});

//! Update Member use PUT
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const found = members.some(member => member.id === Number(id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === Number(id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({
          msg: 'Member updated',
          member
        });
      }
    });
  } else {
    res.status(400).json({
      msg: `No member with the id of ${id}`
    });
  }
});

//! Delete member
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const found = members.some(member => member.id === Number(id));
  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== Number(id))
    });
  } else {
    res.status(400).json({
      msg: `No member with the id of ${id}`
    });
  }
});

module.exports = router;
