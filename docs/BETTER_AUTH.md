# CHANGE PASSWORD / REVOKE SESSION

await authClient.changePassword({
newPassword: newPassword,
currentPassword: currentPassword,
revokeOtherSessions: true,
})
