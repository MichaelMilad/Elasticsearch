const ClientSelects =
    '\`client\`.\`key\` as \`clientKey\`, ' +
    '\`client\`.\`name\` as \`clientName\`, ' +
    '\`client\`.\`email\` as \`clientEmail\`';

const ClientPhoneSelects =
    `\`client_phone\`.\`key\` as \`clientPhoneKey\`,
    \`client_phone\`.\`type\` as \`clientPhoneType\`,
    \`client_phone\`.\`number\` as \`clientPhoneNumber\``;

const ContactSelects =
    `\`client_contact\`.\`key\` as \`contactKey\`,
    \`client_contact\`.\`name\` as \`contactName\`,
    \`client_contact\`.\`email\` as \`contactEmail\`,
    \`client_contact\`.\`signingAuth\` as \`contactSigningAuth\``


const ContactPhonesSelects =
    `\`client_phone\`.\`key\` as \`contactPhoneKey\`,
    \`client_phone\`.\`type\` as \`contactPhoneType\`,
    \`client_phone\`.\`number\` as \`contactPhoneNumber\``;


export function clientSql(query: string) {
    return 'SELECT ' + `${ClientSelects} ` +
        'FROM `client` ' +
        'WHERE (' +
        '`client`.`name` LIKE ' + `'%${query}%' ` +
        'OR `client`.`email` LIKE ' + `'%${query}%' ` +
        'OR `client`.`key` = ' + `'${query}' ` +
        ') ' +
        'AND `client`.`deleted` = false';
}

export function contactSql(query: string) {
    return 'SELECT ' + `${ContactSelects}, ` + '`client`.`key` AS `clientKey` ' +
        'FROM `client_contact` ' +
        'LEFT JOIN `client` ON ' +
        '`client_contact`.`clientId` = `client`.`id` ' +
        'AND `client`.`deleted` = false ' +
        'WHERE ' +
        '`client_contact`.`name` LIKE ' + `'%${query}%' ` +
        'OR `client_contact`.`email` LIKE ' + `'%${query}%' ` +
        'OR `client_contact`.`key` = ' + `'${query}'`;
}

export function clientPhoneSql(query: string) {
    return 'SELECT ' + `${ClientPhoneSelects}, ` + '`client`.`key` AS `clientKey` ' +
        'FROM `client_phone` ' +
        'LEFT JOIN `client` ON ' +
        '`client_phone`.`clientId` = `client`.`id` ' +
        'AND `client`.`deleted` = false ' +
        'WHERE ( ' +
        '`client_phone`.`number` LIKE ' + `'%${query}%' ` +
        'OR `client_phone`.`key` = ' + `'${query}'` +
        ') ' +
        'AND `client_phone`.`clientContactId` IS NULL';
}

export function contactPhoneSql(query: string) {
    return 'SELECT ' + `${ContactPhonesSelects}, ` + '`client_contact`.`key` AS `clientContactKey` ' +
        'FROM `client_phone` ' +
        'LEFT JOIN `client` ON ' +
        '`client_phone`.`clientId` = `client`.`id` ' +
        'AND `client`.`deleted` = false ' +
        'LEFT JOIN `client_contact` ON ' +
        '`client_contact`.`id` = `client_phone`.`clientContactId`' +
        'WHERE ( ' +
        '`client_phone`.`number` LIKE ' + `'%${query}%' ` +
        'OR `client_phone`.`key` = ' + `'${query}'` +
        ') ' +
        'AND `client_phone`.`clientContactId` IS NOT NULL';
}