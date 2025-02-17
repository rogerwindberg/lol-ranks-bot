const i18n = require('i18n');

class Roles {
  constructor(client, config) {
    this.client = client;
    this.config = config;
  }

  async init() {
    const roles = Object.values(i18n.__('ranks')).reverse();
    if (this.config.setVerifiedRole) {
      roles.push(i18n.__('verified'));
    }

    for (const role of roles) {
      const guild = await this.client.guilds.fetch(this.config.guildId);
      const findRole = guild.roles.cache.find(r => r.name === role);
      if (!findRole) {
        await guild.roles.create({ name: role, hoist: true });
        console.log('Created role ' + role);
      }
    }
  }
}

module.exports = {
  Roles,
};