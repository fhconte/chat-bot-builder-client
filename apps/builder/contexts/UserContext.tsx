//import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { isDefined, isNotDefined } from 'utils'
import { updateUser as updateUserInDb } from 'services/user/user'
import { useToast } from '@chakra-ui/react'
import { dequal } from 'dequal'
import { User } from 'db'
import { setUser as setSentryUser } from '@sentry/nextjs'
import { getAuthenticatedUser } from 'services/api/utils'

const userContext = createContext<{
    user?: User
    //   isLoading: boolean
    //   isSaving: boolean
    //   hasUnsavedChanges: boolean
    //   isOAuthProvider: boolean
    //   currentWorkspaceId?: string
    //   updateUser: (newUser: Partial<User>) => void
    //   saveUser: (newUser?: Partial<User>) => Promise<void>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
}>({})

export const UserContext = ({ children }: { children: ReactNode }) => {
    //const router = useRouter()
    const mockUser = getAuthenticatedUser()
    const { data: { session }, status } = { data: { session: { user: mockUser } }, status: 'authenticated' } //useSession()
    const [user, setUser] = useState<User | undefined>()
    // const toast = useToast({
    //     position: 'top-right',
    //     status: 'error',
    // })
    //   const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>()

    //   const [isSaving, setIsSaving] = useState(false)
    //   const isOAuthProvider = false
    //  useMemo(
    //   // () => (session?.providerType as boolean | undefined) ?? false,
    //   // [session?.providerType]
    // )

    // const hasUnsavedChanges = useMemo(
    //     () => !dequal(session?.user, user),
    //     [session?.user, user]
    // )

    useEffect(() => {
        console.log('oi')
        if (isDefined(user) || isNotDefined(session)) return
        // setCurrentWorkspaceId(
        //     localStorage.getItem('currentWorkspaceId') ?? undefined
        // )
        const parsedUser = session.user as User
        setUser(parsedUser)
        if (parsedUser?.id) setSentryUser({ id: parsedUser.id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    // useEffect(() => {
    //     if (!router.isReady) return
    //     if (status === 'loading') return
    //     if (!user && status === 'unauthenticated' && !isSigningIn())
    //         router.replace({
    //             pathname: '/signin',
    //             query:
    //                 router.pathname !== '/typebots'
    //                     ? {
    //                         redirectPath: router.asPath,
    //                     }
    //                     : undefined,
    //         })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status, router])

    //const isSigningIn = () => ['/signin', '/register'].includes(router.pathname)

    // const updateUser = (newUser: Partial<User>) => {
    //     if (isNotDefined(user)) return
    //     setUser({ ...user, ...newUser })
    // }

    // const saveUser = async (newUser?: Partial<User>) => {
    //     if (isNotDefined(user)) return
    //     //setIsSaving(true)
    //     if (newUser) updateUser(newUser)
    //     //const { error } = await updateUserInDb(user.id, { ...user, ...newUser })
    //     //if (error) toast({ title: error.name, description: error.message })
    //     //await refreshUser()
    //     //setIsSaving(false)
    // }

    return (
        <userContext.Provider
            value={{
                user,
                // isSaving: false,
                // isLoading: status === 'loading',
                // hasUnsavedChanges,
                // isOAuthProvider,
                // currentWorkspaceId,
                // updateUser,
                // saveUser,
            }}
        >
            {children}
        </userContext.Provider>
    )
}

// export const refreshUser = async () => {
//     await fetch('/api/auth/session?update')
//     reloadSession()
// }

// const reloadSession = () => {
//     const event = new Event('visibilitychange')
//     document.dispatchEvent(event)
// }

export const useUser = () => useContext(userContext)
