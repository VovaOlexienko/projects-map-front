import {ShortenedGroupDto} from "../dto/ShortenedGroupDto.ts";
import {CreateGroupDto} from "../dto/CreateGroupDto.ts";
import {GroupDto} from "../dto/GroupDto.ts";
import {api} from "./api.ts";

export const groupApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.query<ShortenedGroupDto[], void>({
            query: () => ({url: '/group'}),
            providesTags: ['Groups'],
            keepUnusedDataFor: 0
        }),
        getGroup: builder.query<GroupDto, string | undefined>({
            query: (id) => ({url: `/group/${id}`}),
            providesTags: ['Group'],
            keepUnusedDataFor: 0
        }),
        createGroup: builder.mutation<ShortenedGroupDto, CreateGroupDto>({
            query: (body) => ({
                url: '/group',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Groups'],
        }),
        updateGroup: builder.mutation<void, ShortenedGroupDto>({
            query: ({id, ...body}) => ({
                url: `/group/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Groups', 'Group'],
        }),
        deleteGroup: builder.mutation<void, string>({
            query: (id) => ({
                url: `/group/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Groups'],
        })
    }),
});
