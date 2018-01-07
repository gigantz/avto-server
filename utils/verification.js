import fileManager from 'utils/fileManager';

class Verification {
  constructor() {
    fileManager.read(__dirname + '/verification.txt')
      .then(res => {
        if(!res || !Array.isArray(res)) return false;
        this.userList = JSON.parse(res) || [];
      });
  }

  addUser = (id, code) => {
    this.userList.push({ id, code, exp: Date.now() + 60000 });
    fileManager.write(__dirname + '/verification.txt', JSON.stringify(this.userList));
  }

  verify = (id, code) => {
    const list = this.userList.find(i => i.id === id && i.code === code);
    if (!list) return false;

    if (list.exp >= Date.now()) {
      this.userList = this.userList.filter(i => i.id !== id);
      fileManager.write(__dirname + '/verification.txt', JSON.stringify(this.userList));
      
      console.log(`${id} is verified`);
      return true;
    } else {

      this.userList = this.userList.filter(i => i.id !== id);
      fileManager.write(__dirname + '/verification.txt', JSON.stringify(this.userList));
      
      console.log(`${id} is not verified`);
      return false;
    }
  }

  check = (id) => {
    this.userList = this.userList.filter(i => i.id !== id);
    fileManager.write(__dirname + '/verification.txt', JSON.stringify(this.userList));
  }

  getList = () => {
    return this.userList;
  }
}

export default (new Verification);