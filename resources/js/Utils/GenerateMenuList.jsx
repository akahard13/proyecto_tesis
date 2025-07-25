export function GenerateMenuList(list) {
    const excludedPrefixes = ['payments_plans', 'payments_employees'];

    const viewPermissions = list
        .filter(l =>
            l.permission_name.endsWith('.view') &&
            !excludedPrefixes.includes(l.permission_name.split('.')[0])
        )
        .map(l => ({
            prefix: l.permission_name.split('.')[0],
            page_name: l.page_name,
        }));

    const uniqueViewPermissions = viewPermissions.filter(
        (li, index, self) =>
            index === self.findIndex(l => l.prefix === li.prefix)
    );

    return uniqueViewPermissions;
}
